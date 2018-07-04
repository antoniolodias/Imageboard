Vue.component("image-modal", {
    template: "#image-modal-template",
    props: ["id"],

    data: function() {
        return {
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
            let self = this;

            axios
                .post("/comments", {
                    username: this.commentInfo.username,
                    comment: this.commentInfo.comment,
                    image_id: this.id
                })
                .then(function(results) {
                    self.comments.unshift(results.data);
                })
                .catch(function(err) {
                });
        },
        imageAndComments() {
            var self = this;
            axios.get("/image/" + this.id).then(function(response) {

                self.image = response.data.image;
                self.comments = response.data.comments;
            });
        }
    },

    watch: {
        id: function() {
            if (isNaN(this.id)) {
                this.$emit("closeModal");
                return;
            }
            this.imageAndComments();
        }
    },

    mounted: function() {
        this.imageAndComments();
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
        currentImageId: location.hash.slice(1)
    },

    methods: {
        moreImagesPlease: function() {
            var self = this;
            var lastImageId = this.images[this.images.length - 1];

            axios.get("/images/" + lastImageId.id).then(results => {
                self.images = [...self.images, ...results.data.images];
            });
        },

        getId: function(e) {
            this.currentImageId = e;
        },

        selectFile: function(e) {
            this.imgFormInfo.img = e.target.files[0];
        },
        uploadImage: function(e) {
            e.preventDefault();

            const fd = new FormData();

            fd.append("file", this.imgFormInfo.img);
            fd.append("username", this.imgFormInfo.username);
            fd.append("title", this.imgFormInfo.title);
            fd.append("description", this.imgFormInfo.description);

            axios
                .post("/upload", fd)
                .then(result => {

                    this.images.unshift({
                        url: result.data.img,
                        username: result.data.username,
                        title: result.data.title,
                        description: result.data.description,
                        id: result.data.id

                    });

                    const input = this.$refs.fileInput;
                    input.type = "text";
                    input.type = "file";
                });
        },
        openModal: function(imageId) {
            this.currentImageId = imageId;
        },
        closeModal: function() {
            location.hash = "#";
            this.currentImageId = "";
        }
    },

    created: function() {
        var self = this;
        addEventListener("hashchange", function() {
            self.currentImageId = location.hash.slice(1);
        });
    },

    mounted: function() {

        var self = this;
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
