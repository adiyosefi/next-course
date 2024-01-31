'use client';
import React, {useState} from 'react'
import {CldUploadWidget, CldImage, CldUploadWidgetResults} from "next-cloudinary";

interface CloudinaryResult {
    public_id: string;
}

const UploadPage = () => {
    const [publicId, setPublicId] = useState('');

    const uploadFile = (result: CldUploadWidgetResults) => {
        if (result.event !== 'success') return;
        const info = result.info as CloudinaryResult;
        setPublicId(info.public_id);
    };

    return (
        <>
            {publicId &&
                <CldImage alt="a coffee image" width={270} height={180} src={publicId}/>}
            <CldUploadWidget
                uploadPreset="hwcoaqgb"
                options={{
                    sources: ['local'],
                    multiple: true,
                    maxFiles: 5,
                    styles: {
                        fonts: {
                            default: null,
                            "'Poppins', sans-serif": {
                                url: "https://fonts.googleapis.com/css?family=Poppins",
                                active: true
                            }
                        }
                    }
                }}
                onUpload={(result) => uploadFile(result)}>
                {({open}) =>
                    <button className="btn btn-primary" onClick={() => open()}>Upload</button>}
            </CldUploadWidget>
        </>

    )
}
export default UploadPage
