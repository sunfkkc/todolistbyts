declare global {
  interface Window {
    kakao: any;
  }
}

function getGPS(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((res) => {
      if (res) {
        return resolve(res.coords);
      } else {
        return reject(new Error("cannot get GPS"));
      }
    });
  });
}

const geocoder = new window.kakao.maps.services.Geocoder();

export async function getLocation(): Promise<any> {
  try {
    const { longitude, latitude } = await getGPS();

    return new Promise((resolve, reject) => {
      geocoder.coord2RegionCode(
        longitude,
        latitude,
        (msg: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(msg[0].address_name);
          } else {
            reject(new Error("Bad Server"));
          }
        }
      );
    });
  } catch (err: any) {
    return new Promise((resolve, reject) => {
      console.log(err);
      reject(new Error(err));
    });
  }
}
