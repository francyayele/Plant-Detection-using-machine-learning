$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    $('#description').hide();
    $('#treatment').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                /* $('#imagePreview').css('background-image', 'url(' + e.target.result + ')'); */
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
                $('#preview-image').show();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#treatment').text('');
        $('#description').text('');
        $('#result').hide();
        $('#description').hide();
        $('#treatment').hide();
        readURL(this);
    });

    // function will return the description of the disease

    function getDescription(data) {
        var datadict = {
            'Pepper__bell___Bacterial_spot': "A bacterial disease caused by Xanthomonas campestris that results in brown or black spots on leaves, stems, and fruit of pepper plants",
            'Pepper__bell___healthy': "healthy",
            'Potato___Early_blight': "A fungal disease caused by Alternaria solani that results in dark, circular spots on leaves, stem and tubers of potato plants.",
            'Potato___Late_blight': "A fungal disease caused by Phytophthora infestans that results in large, dark, water-soaked spots on leaves, stem and tubers of potato plants.",
            'Potato___healthy': "healthy",
            'Tomato_Bacterial_spot': "A bacterial disease caused by Xanthomonas campestris that results in small, circular, dark spots on leaves, stems, and fruit of tomato plants.",
            'Tomato_Early_blight': "A fungal disease caused by Alternaria solani that results in dark, circular spots on leaves, stem and fruit of tomato plants.",
            'Tomato_Late_blight': "A fungal disease caused by Phytophthora infestans that results in large, dark, water-soaked spots on leaves, stem and fruit of tomato plants.",
            'Tomato_Leaf_Mold': "A fungal disease caused by Fulvia fulva that results in moldy, discolored leaves on tomato plants.",
            'Tomato_Septoria_leaf_spot': "A fungal disease caused by Septoria lycopersici that results in small, circular, dark spots on leaves of tomato plants.",
            'Tomato_Spider_mites_Two_spotted_spider_mite': "A pest caused by the Two-spotted spider mite that results in yellowing, stippling and bronzing of leaves, and webbing on tomato plants.",
            'Tomato__Target_Spot': "A fungal disease caused by Corynespora cassiicola that results in small, circular, dark spots on leaves and fruit of tomato plants.",
            'Tomato__YellowLeaf__Curl_Virus': "A viral disease caused by the Tomato yellow leaf curl virus that results in yellowing, curling and stunting of leaves, and reduced fruit production in tomato plants.",
            'Tomato_mosaic_virus': "A viral disease caused by the Tomato mosaic virus that results in mottled or yellowed leaves, stunted growth and reduced fruit production in tomato plants.",
            'Tomato_healthy': "healthy"
        };
        
    
        $('#description, #treatment').css('font-size', '20px');
        return datadict[data];
    }
    

    // function will return the treatment for the specified disease
    function getTreatment(data) {

        var datadict = {
            'Pepper__bell___Bacterial_spot':"Chemical treatment with copper-based fungicides or Streptomycin can help control the spread of the disease. Cultural control practices such as crop rotation, sanitation and maintaining proper field drainage can also help prevent the disease.",
            'Pepper__bell___healthy':"Keep it healthy",
            'Potato___Early_blight': "Chemical treatment with fungicides such as Mancozeb or chlorothalonil can help control the spread of the disease. Cultural control practices such as crop rotation, sanitation, and maintaining proper field drainage can also help prevent the disease." ,
            'Potato___Late_blight': "Chemical treatment with fungicides such as metalaxyl, mancozeb and mefenoxam can help control the spread of the disease. Cultural control practices such as crop rotation, sanitation, and maintaining proper field drainage can also help prevent the disease.",
            'Potato___healthy': "Keep it healthy",
            'Tomato_Bacterial_spot': "Chemical treatment with copper-based fungicides or Streptomycin can help control the spread of the disease. Cultural control practices such as crop rotation, sanitation and maintaining proper field drainage can also help prevent the disease." ,
            'Tomato_Early_blight': "Chemical treatment with fungicides such as Mancozeb or chlorothalonil can help control the spread of the disease. Cultural control practices such as crop rotation, sanitation, and maintaining proper field drainage can also help prevent the disease.",
            'Tomato_Late_blight': "Chemical treatment with fungicides such as metalaxyl, mancozeb and mefenoxam can help control the spread of the disease. Cultural control practices such as crop rotation, sanitation, and maintaining proper field drainage can also help prevent the disease.",
            'Tomato_Leaf_Mold': "Chemical treatment with fungicides such as chlorothalonil or iprodione can help control the spread of the disease. Cultural control practices such as maintaining proper air circulation, sanitation, and avoiding overhead irrigation can also help prevent the disease." ,
            'Tomato_Septoria_leaf_spot': "Chemical treatment with fungicides such as mancozeb, chlorothalonil or azoxystrobin can help control the spread of the disease. Cultural control practices such as crop rotation, sanitation, and maintaining proper field drainage can also help prevent the disease.",
            'Tomato_Spider_mites_Two_spotted_spider_mite': "Chemical treatment with miticides such as abamectin or bifenazate can help control the spread of the disease. Cultural control practices such as maintaining proper air circulation, sanitation, and avoiding dry conditions can also help prevent the infestation." ,
            'Tomato__Target_Spot': "Chemical treatment with fungicides such as mancozeb, chlorothalonil or azoxystrobin can help control the spread of the disease. Cultural control practices such as crop rotation, sanitation, and maintaining proper field drainage can also help prevent the disease.",
            'Tomato__YellowLeaf__Curl_Virus': "There is no cure for viral diseases, so management strategies include using resistant varieties, removing infected plants, and practicing good sanitation.",
            'Tomato_mosaic_virus': "There is no cure for viral diseases, so management strategies include using resistant varieties, removing infected plants, and practicing good sanitation.",
            'Tomato_healthy':"Keep it healthy"
    };
    
    $('#description, #treatment') .css('font-size', '15px') .css('font-weight', '300').css( 'margin', '0', '0' , '30px').css('font-type', 'poppin')
   
   
    return datadict[data];
    }
    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                if (getDescription(data) != 'healthy'){
                    $('#treatment').fadeIn(600);
                }
                $('#description').fadeIn(600);
                $('#result').text('Result:  ' + data);
                $('#description').text('Description: ' + getDescription(data));
                $('#treatment').text('Treatment: ' + getTreatment(data));
                console.log('Success!');
            },
        });
    });

});
