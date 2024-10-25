const Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (e) {
    let t = ''
    let n, r, i, s, o, u, a
    let f = 0
    e = Base64._utf8_encode(e)
    while (f < e.length) {
      n = e.charCodeAt(f++)
      r = e.charCodeAt(f++)
      i = e.charCodeAt(f++)
      s = n >> 2
      o = ((n & 3) << 4) | (r >> 4)
      u = ((r & 15) << 2) | (i >> 6)
      a = i & 63
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a)
    }
    return t
  },
  decode: function (e) {
    let t = ''
    let n, r, i
    let s, o, u, a
    let f = 0
    e = e.replace(/[^A-Za-z0-9+/=]/g, '')
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++))
      o = this._keyStr.indexOf(e.charAt(f++))
      u = this._keyStr.indexOf(e.charAt(f++))
      a = this._keyStr.indexOf(e.charAt(f++))
      n = (s << 2) | (o >> 4)
      r = ((o & 15) << 4) | (u >> 2)
      i = ((u & 3) << 6) | a
      t = t + String.fromCharCode(n)
      if (u != 64) {
        t = t + String.fromCharCode(r)
      }
      if (a != 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = Base64._utf8_decode(t)
    return t
  },
  _utf8_encode: function (e) {
    e = e.replace(/rn/g, 'n')
    let t = ''
    for (let n = 0; n < e.length; n++) {
      let r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192)
        t += String.fromCharCode((r & 63) | 128)
      } else {
        t += String.fromCharCode((r >> 12) | 224)
        t += String.fromCharCode(((r >> 6) & 63) | 128)
        t += String.fromCharCode((r & 63) | 128)
      }
    }
    return t
  },
  _utf8_decode: function (e) {
    let t = ''
    let n = 0
    let r = 0
    let c1 = 0
    let c2 = 0
    let c3 = 0
    while (n < e.length) {
      r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1)
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63))
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1)
        c3 = e.charCodeAt(n + 2)
        t += String.fromCharCode(
          ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        )
        n += 3
      }
    }
    return t
  }
}

// function getDisplayCoord(coord, scope, isbd09, isgcj02) {
//   // if (!(coord.isValid(new hmap.proj.Crs('4326')))) {
//   if (isbd09 || (scope.map && scope.map.isbd09)) {
//     // 百度坐标转换
//     let result = gcoord.transform(
//       [coord._x, coord._y],
//       gcoord.BD09MC,
//       gcoord.BD09
//     );
//     if (scope.isRectify !== false) {
//       result = gcoord.transform(result, gcoord.BD09, gcoord.GCJ02);
//       result = gcoord.transform(result, gcoord.GCJ02, gcoord.WGS84);
//     }
//     coord._x = result[0];
//     coord._y = result[1];
//   } else {
//     const srid = scope.getSrid ? scope.getSrid() : scope.map.getCrs().getSrid();
//     hmap.proj.Transformer.transform(coord, srid, 4326);
//     if (
//       ((scope.map && scope.map.isgcj02) || isgcj02) &&
//       scope.isRectify !== false
//     ) {
//       let result = gcoord.transform(
//         [coord._x, coord._y],
//         gcoord.GCJ02,
//         gcoord.WGS84
//       );
//       coord._x = result[0];
//       coord._y = result[1];
//     }
//   }
//   // }
//   return coord;
// }

function rewriteHmapMethod () {
  // 添加代理
  hmap.layer.TMSLayer.prototype.setTileUrl = function (xyz) {
    let [x, y, z] = xyz.split('#') // 行列号标识
    if (this.layerZFunc) {
      z = this.layerZFunc(z, this.maxLevel)
    }
    let url = this.layerUrl
      .replace('{x}', x)
      .replace('{y}', y)
      .replace('{z}', z)
    if (url.indexOf('http://') > -1) {
      const context = this._map.config
        ? this._map.config.proxyUrl || '/ngx/proxy?i='
        : '/ngx/proxy?i='
      url = context + Base64.encode(url)
    }
    return url
  }
  hmap.layer.WMTSLayer.prototype.setTileUrl = function (xyz) {
    let [x, y, z] = xyz.split('#') // 行列号标识
    if (this.layerZFunc) {
      z = this.layerZFunc(z, this.maxLevel)
    }
    let url = this._requestUrl(x, y, z)
    if (url.indexOf('http://') > -1) {
      const context = this._map.config
        ? this._map.config.proxyUrl || '/ngx/proxy?i='
        : '/ngx/proxy?i='
      url = context + Base64.encode(url)
    }
    // if (this._map.config && this._map.config.proxyUrl) {
    //     url = this._map.config.proxyUrl + Base64.encode(url)
    // }
    return url
  }
  hmap.layer.VectorTileLayer.prototype.setTileUrl = function (xyz) {
    const [x, y, z] = xyz.split('#') // 行列号标识
    let url = ``
    if (this.dataFormat) {
      url = `${ this.layerUrl }${ z }/${ x }/${ y }.${ this.dataFormat }`
    } else {
      url = `${ this.layerUrl }${ z }/${ x }/${ y }`
    }
    if (
      url.indexOf('http://') > -1 &&
      (!this._map.config || this._map.config.useProxy !== false)
    ) {
      const context = this._map.config
        ? this._map.config.proxyUrl || '/ngx/proxy?i='
        : '/ngx/proxy?i='
      url = context + Base64.encode(url)
    }
    // if (this._map.config && this._map.config.proxyUrl) {
    //     url = this._map.config.proxyUrl + Base64.encode(url)
    // }
    return url
  }
}

export { rewriteHmapMethod }
