import { useMutation } from '@tanstack/react-query';

const useAttacheFiles: any = (options = {}) =>
  useMutation(async (id: string | undefined) => {
    if (id !== undefined) {
      try {
        const filename = '';
        const token: string | null = JSON.parse(
          localStorage.getItem('token') as string
        );

        if (token !== null) {
          void fetch(
            `https://apimeetk.analysed.ai/api/sub-activity/course/${id}/download/applicants`,
            {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` }
            }
          )
            .then(async (result) => {
              if (!result.ok) {
                throw Error(result.statusText);
              }
              return await result.blob();
            })
            .then((blob) => {
              if (blob != null) {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
              }
            });
        }

        return {};
      } catch (error) {}
    }
  }, options);
export default useAttacheFiles;
