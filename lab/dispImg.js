function updateImageDisplay() {
  //while(preview.firstChild) {
  //  preview.removeChild(preview.firstChild);
  //}

  const curFiles = $("input").prop("files");
  if(curFiles.length === 0) {
    $("#warnMsg").show();
  } else {
    $("#warnMsg").hide();
    $("#slideTable").show();

    const tBody = $("#slideRow");
    for(const file of curFiles) {
      if(validFileType(file)) {
        const image = $('<img>');
        image.attr("src",URL.createObjectURL(file));
        image.attr("width", "200px");
        const imageTd = $('<td>');
        imageTd.append(image);

        const textArea = $('<textarea>');
        textArea.attr('cols', '40');
        textArea.attr('rows', '8');
        textArea.attr('style', 'width: 100%; height: 100%');
        const textTd = $('<td>');
        textTd.append(textArea);

        const tblRow = $('<tr>');
        tblRow.append(imageTd);
        tblRow.append(textTd);
        tBody.append(tblRow);
        //listItem.append(para);
      } else {
        ///_para.textContent = `ファイル名: ${file.name}: ファイル形式が有効ではありません。選択しなおしてください。`;
        ///zlistItem.append(para);
      }

    }
  }
}

function loadData () {
  slides = [];
  var $rows = $("#slideRow").children();

  var i = 0;
  while ($rows.length >= i+1) {
    //console.log($rows[i]);
    slides.push([$($rows[i]).find('img').attr('src'),
                $($rows[i]).find('textArea').val()]);
    i += 1;
  }
  console.log(slides);

  $("copyTable").show();

  const tBody = $("#copyRow");
  for(const slide of slides) {
      const image = $('<img>');
      image.attr("src", slide[0]);
      image.attr("width", "200px");
      const imageTd = $('<td>');
      imageTd.append(image);

      const textTd = $('<td>');
      textTd.append(slide[1]);

      const tblRow = $('<tr>');
      tblRow.append(imageTd);
      tblRow.append(textTd);
      tBody.append(tblRow);
      //listItem.append(para);
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
