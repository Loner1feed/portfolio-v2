import React, { useState } from 'react';
// import { ItemsService } from 'services/items.service';
import { Button } from '../button/button';
import { ItemsService } from 'services/items.service';

export const TestImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);

  // const convert = (file: File): Promise<FileDataTypes> => {
  //   return new Promise((resolve, reject) => {
  //     const fileName = file.name;
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve({ bytes: fileReader.result, name: fileName });
  //     };

  //     fileReader.onerror = error => {
  //       reject(error);
  //     };
  //   });
  // };

  const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    console.log(fileList);

    setImage(fileList[0]);
  };

  const itemUpload = async () => {
    if (!image) return;

    const data = {
      title: 'Portfolio-item 1 (aboba)',
      description: 'some item description',
      isSimple: true,
      websiteUrl: 'https://google.com',
      repoUrl: 'https://github.com',
      stack: ['HTML', 'SCSS', 'JQuery'],
      imageUrl:
        'https://res.cloudinary.com/dacid8lii/image/upload/v1713531776/xwpgnwmkq3vmx1pm8kjl.png',
      imagePublicId: 'xwpgnwmkq3vmx1pm8kjl',
    };

    // set object to formData
    const form_data = new FormData();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const key in data) form_data.append(key, JSON.stringify(data[key]));

    // if (image) form_data.append('image', image);

    // console.log(data);
    ItemsService.sendItem(form_data);
  };

  return (
    <div>
      <h1>File upload</h1>
      <input type="file" onChange={fileUpload} />
      <Button label="Upload" onClick={itemUpload} />
    </div>
  );
};
