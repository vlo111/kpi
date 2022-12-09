import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../client";
import { noop } from "../../helpers/utils";

import { URL_GET_PROJECTS } from "./useGetProject";

const url = "api/project/:id";

const useEditProject = (params, { onSuccess = noop, ...restOptions }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (values) => await client.put(url.replace(":id", params.id), values),
    {
      ...restOptions,
      onSuccess: () => {
        queryClient.invalidateQueries([URL_GET_PROJECTS]);
        onSuccess();
      },
    }
  );
  return mutation;
};

export default useEditProject;
