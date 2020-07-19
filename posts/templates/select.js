const loadSelect = (url, valueField, labelField, field) => {
    $.get(`http://127.0.0.1:5000/${url}/`, data => {
        $.each(data['result'], (index, item) => {
            field.append('<option value="' +  item[valueField] + '">' +  item[labelField] + '</option>')
        })
        field.select2()
    })
}
