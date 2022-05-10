const REACT_APP_KAKAO_MAPS_API_KEY = process.env.REACT_APP_KAKAO_MAPS_API_KEY;

interface Region {
  region_type: string;
  address_name: string;
}

interface FetchDataForm {
  meta: object;
  documents: Region[];
}

// const somethingWrong = new Error('asdasdas');

try {
  await getGPS();
} catch (err) {
  if (err instanceof Error) {
  } else if (err instanceof GeolocationPositionError) {
  }
}

function getGPS(): Promise<GeolocationCoordinates> {
  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        // something addsa
        // throew new Erorr()
        return resolve(res.coords);
      },
      (err) => {
        reject(err.message);
      }
    );
  });
}

// export async function getLocation(): Promise<string> {
//   try {
//     const gps = await getGPS();

//     const data = await fetchKakaoReverseApi(gps);
//     const location = data.documents[0].address_name;

//     return new Promise((resolve) => {
//       resolve(location);
//     });
//   } catch (err) {
//     return new Promise((reject) => {
//       reject("장소를 찾을 수 없습니다");
//     });
//   }
// }

export async function getLocation(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const gps = await getGPS();

      const data = await fetchKakaoReverseApi(gps);
      const location = data.documents[0].address_name;
      return resolve(location);
    } catch (err) {
      console.error(err);
      return resolve("장소를 찾을 수 없습니다.");
    }
  });
}

const fetchKakaoReverseApi = async (
  gps: GeolocationCoordinates
): Promise<FetchDataForm> => {
  const { latitude, longitude } = gps;

  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;

  const option = {
    method: "get",
    headers: {
      Authorization: `KakaoAK ${REACT_APP_KAKAO_MAPS_API_KEY}`,
    },
  };

  const res = await fetch(url, option);

  if (res.ok) {
    return new Promise((resolve) => {
      resolve(res.json());
    });
  } else {
    throw new Error("cannot get fetchdata");
  }
};

// clean code > information, data 지양

class GeolocationPositionErrorGPS extends Error {
  constructor(err: Gel) {
    this.message = err.message;
  }
}

throw new GeolocationPositionErrorGPS();
