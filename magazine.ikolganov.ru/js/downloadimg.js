var linkUser
let photoName
function addComments() {
    let date = new Date()
    linkUser = `../images/${date.getTime()}.jpg`
    photoName = `${date.getTime()}.jpg`
    return 'ok'
}

$('document').ready(
    function () {
        var form = $('#myform');
        $('#add-new-magazine').on('click',function () {
            /* if(addComments() === 'ok'){*/
            let file = $('#photo-magazine-download')[0].files[0]
            if ((($('#photo-magazine-download')[0].files).length != 0) && (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') && (file.size < 2e6)){
                var formData = new FormData();
                if (($('#photo-magazine-download')[0].files).length != 0) {
                    $.each($('#photo-magazine-download')[0].files, function (i, file) {
                        formData.append("file[" + i + "]", file, photoName);
                        console.log(photoName)
                    });
                } else {
                    console.log('Нужно выбрать файл');
                    alert('Вы не выбрали обложку журнала!')
                    return false;
                }

                $.ajax({
                    type: 'POST',
                    url: '../functions/downloadimg.php',
                    data: formData,
                    cache: false,
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        console.log('Запрос начат');
                        form.find('input').prop("disabled", true);
                    },
                    success: function (data) {
                        if (data.status == 'ok') {
                            console.log('Файлы загружены');
                            $('#photo-magazine-download').val('');
                        }else{
                            console.log('Загрузка не работает');
                        }
                    },
                    complete: function () {
                        console.log('Запрос закончен');
                        form.find('input').prop("disabled", false);
                    }
                });
                return false;
                /*}else{

                }*/
            }
        });
    }
);

