import api from "../api/axios";

const getImage = async (): Promise<string> => {
  console.log("getImage called");

  const { data } = await api.get("image/image-humanresources", {
    responseType: "blob",
  });

  const url = URL.createObjectURL(data);
  console.log("URL:", url);

  return url;
};

export default getImage;