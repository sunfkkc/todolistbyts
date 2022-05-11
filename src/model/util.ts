const REACT_APP_KAKAO_MAPS_API_KEY = process.env.REACT_APP_KAKAO_MAPS_API_KEY;

interface Region {
  region_type: string;
  address_name: string;
}

interface FetchDataForm {
  meta: object;
  documents: Region[];
}

function getGPS(): Promise<GeolocationCoordinates> {
  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        return resolve(res.coords);
      },
      (err) => {
        reject(err.message);
      }
    );
  });
}
const fetchKakaoReverseApi = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const { longitude, latitude } = await getGPS();

    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;

    const option = {
      method: "get",
      headers: {
        Authorization: `KakaoAK ${REACT_APP_KAKAO_MAPS_API_KEY}`,
      },
    };

    const res = await fetch(url, option);
    if (res.ok) {
      const coord2RegionData: FetchDataForm = await res.json();
      return resolve(coord2RegionData.documents[0].address_name);
    } else {
      return reject("invalid fetching");
    }
  });
};

export async function getLocation(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const location = await fetchKakaoReverseApi();
      return resolve(location);
    } catch (err) {
      console.error(err);
      return resolve("장소를 찾을 수 없습니다.");
    }
  });
}
