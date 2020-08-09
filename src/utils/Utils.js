import { Api } from "../api/api";

// eslint-disable-next-line import/no-named-as-default,import/extensions

class Utils {
  static fileUrl(url) {
    if (!url) return url;

    if (!/https?:\/\//.test(url) && !url.toString().includes(';base64,')) {
      try {
        url = JSON.parse(url)[0];
      } catch (e) {
        //
      }
      // return Api.url + '/uploads/' + url;
      return `${Api.url}/avatars/${url}`;

    }

    return url;
  }
  static videoUrl(url) {
    if (!url) return url;

    if (!/https?:\/\//.test(url) && !url.toString().includes(';base64,')) {
      try {
        url = JSON.parse(url)[0];
      } catch (e) {
        //
      }
      // return Api.url + '/uploads/' + url;
      return `${Api.url}/videos/${url}`;

    }

    return url;
  }
}


export default Utils;

