import { useMutation } from "@tanstack/react-query";

const useAttacheFiles: any = (options = {}) =>
  useMutation(async (id: any) => {
    if (id !== undefined) {
      try {
        var filename = "";
        const token: string | null = JSON.parse(
          localStorage.getItem("token") as string
        );

        fetch(
          `https://apimeetk.analysed.ai/api/sub-activity/course/${id}/download/applicants`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        )
          .then((result) => {
            if (!result.ok) {
              throw Error(result.statusText);
            }
            return result.blob();
          })
          .then((blob) => {
            if (blob != null) {
              var url = window.URL.createObjectURL(blob);
              var a = document.createElement("a");
              a.href = url;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              a.remove();
            }
          });
        return {};
      } catch (error) {}
    }
  }, options);
export default useAttacheFiles;
