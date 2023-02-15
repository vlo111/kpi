import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const Signature = () => {
  const canvasRef = useRef(null);

//   const handleDownload = () => {
//     if (canvasRef.current) {
//       const url = canvasRef.current.getTrimmedCanvas().toDataURL('image/png');
//       const dlink = document.createElement("a");
//       dlink.setAttribute("href", url);
//       dlink.setAttribute("download", "signature.png");
//       dlink.click();
//     }
//   };

  return (
    <div>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 100, height: 100}}
        ref={canvasRef}
      />
      {/* <button onClick={handleDownload}>Download Signature</button> */}
    </div>
  );
};

export default Signature;