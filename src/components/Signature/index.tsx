import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from 'antd';

const Signature = (): any => {
  const sigRef = useRef<any>();
  const [signature, setSignature] = useState(null);
  const handleSignatureEnd = (): any => {
    setSignature(sigRef.current.toDataURL());
  };
  const clearSignature = (): any => {
    sigRef.current.clear();
    setSignature(null);
  };

  useEffect(() => {
  }, [signature]);

  return <div>
    <SignatureCanvas
      penColor="black"
      canvasProps={{ width: 200, height: 50 }}
      ref={sigRef}
      onEnd={handleSignatureEnd}
    />
    <Button type='link' onClick={clearSignature}>Clear</Button>
  </div>;
};

export default Signature;
