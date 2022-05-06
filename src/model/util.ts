declare global {
  interface Window {
    kakao: any;
  }
}

interface GPS {
  longitude: number;
  latitude: number;
}

function getGPS() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const geocoder = new window.kakao.maps.services.Geocoder();

export async function getLocation() {
  const { coords }: any = await getGPS(); // any를 써도 되는지...
  const { longitude, latitude }: GPS = coords;

  return new Promise((resolve, reject) => {
    geocoder.coord2RegionCode(
      longitude,
      latitude,
      (msg: any, status: any) /*any를 써도 되는지...*/ => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(msg[0].address_name);
        } else {
          reject(new Error("Bad Server"));
        }
      }
    );
  });
}
