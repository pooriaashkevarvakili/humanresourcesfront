import { useQuery } from "@tanstack/react-query";
import getImage  from "../service/image.services";

export const useImage = () => {
  return useQuery({
    queryKey: ["image"],
    queryFn: getImage,
  });
};