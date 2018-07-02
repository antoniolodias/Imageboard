Vue.component("image-modal", {
    //("image-modal" is the html TAG!

    template: "#image-modal-template", //script tag in html
    props: ["id"], // array for the properties that will be used
    // template: "<span>{{name}}, {{country}}</span>",
    data: function() {
        return {
            // text: "Hello Populate this",
            image: {},
            comments: [],
            commentInfo: {}
        };
    },
    methods: {
        closeMe: function(e) {
            this.$emit("close");
        },
        commentImage: function() {
            console.log("lets comment this image");
            // in axios post req.body.comments,req.

            let self = this;

            axios
                .post("/comments", {
                    username: this.commentInfo.username,
                    comment: this.commentInfo.comment,
                    image_id: this.id // this one comes from props UP
                })
                .then(function(results) {
                    console.log("axios post results: ", results);
                    self.comments.unshift(results.data);
                })
                .catch(function(err) {
                    console.log("error updating comments: ", err);
                });
        },
        imageAndComments() {
            var self = this;
            axios.get("/image/" + this.id).then(function(response) {
                console.log("Watch Response: ", response);

                self.image = response.data.image;
                self.comments = response.data.comments;
            });
        }
    },

    watch: {
        id: function() {
            console.log("Watch id change something");
            if (isNaN(this.id)) {
                console.log("is NAN fired?");
                this.$emit("closeModal");
                return;
            }
            this.imageAndComments();
            // var self = this;
            // axios.get("/image/" + this.id).then(function(response) {
            //     console.log("Watch Response: ", response);
            //
            //     self.image = response.data.image;
            //     self.comments = response.data.comments;
            // });
        }
        // combinedFunction: {
        //     handler: function(res, req) {
        //         this.imageAndComments();
        //     }
        // }
    },

    mounted: function() {
        this.imageAndComments();
        // var self = this;
        //
        // axios.get("/image/" + this.id).then(function(response) {
        //     console.log("image info ALL: ", response);
        //     console.log("image: ", response.data.image);
        //     self.image = response.data.image;
        //     self.comments = response.data.comments;
        // });
    }
});

//------------------------------------------
new Vue({
    el: "main",
    data: {
        images: [],
        imgFormInfo: {
            title: "",
            description: "",
            username: "",
            img: null
        },
        imgtransparency: [],
        imgFile: "#",
        currentImageId: location.hash.slice(1) // when you click on image this activates
    },

    methods: {
        // showText(index) {
        //     this.imgtransparency[index] = true;
        // },
        // hideText(index) {
        //     this.imgtransparency[index] = false;
        // },
        // showImage: function(e){
        //
        // }
        moreImagesPlease: function() {
            console.log("more PICTUUUUUURES");
            var self = this;
            var lastImageId = this.images[this.images.length - 1];

            console.log(lastImageId);
            console.log(lastImageId.id);
            axios.get("/images/" + lastImageId.id).then(results => {
                console.log("more pictures axios: ", results);
                // self.images.concat(results.data);
                self.images = [...self.images, ...results.data.images];
            });
        },

        getId: function(e) {
            this.currentImageId = e;
        },

        selectFile: function(e) {
            console.log("running selsctFile");
            this.imgFormInfo.img = e.target.files[0];
            console.log(this.imgFormInfo);
        },
        uploadImage: function(e) {
            e.preventDefault();

            const fd = new FormData(); //FormData deals with non text data

            fd.append("file", this.imgFormInfo.img);
            fd.append("username", this.imgFormInfo.username);
            fd.append("title", this.imgFormInfo.title);
            fd.append("description", this.imgFormInfo.description);

            console.log(fd); // YOU CANT LOG FormData

            axios
                .post("/upload", fd) //1 url, 2 data you want to pass
                .then(result => {
                    console.log("our result: ", result);

                    this.images.unshift({
                        url: result.data.img,
                        username: result.data.username,
                        title: result.data.title,
                        description: result.data.description,
                        id: result.data.id

                        //here is where things are rendered
                    });
                    // this.images.unshift(result.data);| to write less code delete previous vars and swap the unshift with this
                    console.log(this);
                    // result.data;

                    const input = this.$refs.fileInput;
                    input.type = "text";
                    input.type = "file";
                });
        },
        openModal: function(imageId) {
            console.log("its opening the modal");
            this.currentImageId = imageId;
        },
        closeModal: function() {
            console.log("will close modal");
            location.hash = "#";
            this.currentImageId = ""; //empty string for the hash stuff
        }
    },
    //--------------------------
    // watch: {
    //     currentImageId: function() {
    //         console.log("Watch id change something");
    //         if (isNaN(this.currentImageId)) {
    //             console.log("is NAN fired?");
    //             this.$emit("closeModal");
    //             return;
    //         }
    //         var self = this;
    //         axios.get("/image/" + this.currentImageId).then(function(response) {
    //             console.log("Watch Response: ", response);
    //
    //             self.image = response.data.image;
    //             self.comments = response.data.comments;
    //         });
    //     }
    // },
    created: function() {
        var self = this;
        addEventListener("hashchange", function() {
            self.currentImageId = location.hash.slice(1);
            console.log("Location Hash: ", location.hash);
        });
    },
    //--------------------------

    mounted: function() {
        // mounted only runs when the page loads
        // function transparencyfier() {
        //     for (var i = 0; i < this.items.length; i++) {
        //         this.infoBar.push(false);
        //     }
        // },
        var self = this; // you need to put it in a outside variable so it mounts for every result
        axios
            .get("/images")
            .then(function(resp) {
                self.images = resp.data.images;
            })
            .catch(function(err) {
                console.log(err);
            });
    }
});
