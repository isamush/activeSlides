function updateImageDisplay() {
  //while(preview.firstChild) {
  //  preview.removeChild(preview.firstChild);
  //}

  const curFiles = $("input").prop("files");
  if(curFiles.length === 0) {
    $("#warnMsg").show();
  } else {
    //$("#warnMsg").hide();
    list = $("ol");
    console.log('file is se.');
    if (!list.length) {
      console.log('list is created.');
      list = $('<ol>');
      $("#warnMsg").append(list);
    }

    for(const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if(validFileType(file)) {
        para.textContent = `ファイル名: ${file.name}, ファイルの長さ: ${returnFileSize(file.size)}.`;
        image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        image.setAttribute("width", "50px");

        listItem.append(image);
        listItem.append(para);
      } else {
        para.textContent = `ファイル名: ${file.name}: ファイル形式が有効ではありません。選択しなおしてください。`;
        listItem.append(para);
      }

      list.append(listItem);
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}
