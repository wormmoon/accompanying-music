function getImages() {
    $.ajax({
        url: "https://api.vam.ac.uk/v2/objects/search?q=Bed Ware&page_size=50",
            //"https://api.vam.ac.uk/v2/objects/clusters/material/search?id_place=x29337&made_after_year=1700&made_before_year=1800&cluster_size=10",
        // "https://api.vam.ac.uk/v2/museumobject/O828146",
        type:"Get",
        // data:{
        //     image:""'
        // },
        success:function(response){
                // document.getElementById('myCanvas') = response["_primary_thumbnail"];//response["record"]["titles"][0]["title"]
            i = 0;
            // for (key in response["records"]) {
            //     var obj = response[key];
            //     for (var prop in obj) {

                    // var elem = document.createElement("img");
                    // elem.setAttribute("src", response["records"][0]["_images"]["_iiif_image_base_url"] + 'full/!600,600/0/default.jpg');
                    // elem.setAttribute("height", "768");
                    // elem.setAttribute("width", "1024");
                    // elem.setAttribute("alt", "Flower");
                    // document.getElementById("placehere").appendChild(elem);
                    setImgSrc(response["records"][0]["_images"]["_iiif_image_base_url"] + 'full/!600,600/0/default.jpg');
            //     }
            // }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(this.error);
        }
    });
}
