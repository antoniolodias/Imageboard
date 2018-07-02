const app = new Vue({
    el: "#main", // you pass an object and you
    data: {
        // object that you list properties that will print in main ypu can access for example heading ,
        heading: "My Vue App Heading"
    }
});

setTimeout(function() {
    app.heading = "Heading has changed!!!!";
}, 2000);
//------------

const app = new Vue({
    el: "#main",
    data: {
        heading: "TALKING HEADS",
        headingClassName: "cute"
    }
});

//LOOPS

<div id="main">
    <ul v-if="cities.length > 0">
        <li v-for="city in cities">{{city.name}}, {{city.country}}
    </ul>
</div>

new Vue({
    el: '#main',
    data: {
        cities: [
            {
                name: 'Berlin',
                country: 'Germany'
            },
            {
                name: 'Hamburg',
                country: 'Germany'
            }
        ]
    }
});


new Vue({

    el: '#main',
    data: {
        greetee: '' // greetee is an empty string so
    },
    methods: {
        setGreetee:function(str){
            this.gretee = str.toUpperCase();
            this.log();
        },
        log:function(){
            console.log("this is great!");
        }
    }
});
-----

<div id="main">
     <h1>Cities</h1>
    <ul v-if="cities.length > 0">
        <li v-for="city in cities">{{city.name}}, {{city.country}}
    </ul>
</div>

new Vue({

    el: '#main',
    data: {
        greetee: '' // greetee is an empty string so
    },

    created: function(){
        console.log("created");
    },
    mounted: function(){
        var myViewInstance = this;
        axios.get("/cities".then(function(response){
            console.log(response);
            console.log(response.data);
            myViewInstance.cities =response.data.cities;
            myViewInstance.log();
        }).catch(function(){

        })
    },

    methods: {
        setGreetee:function(str){
            this.gretee = str.toUpperCase();
            this.log();
        },
        log:function(){
            console.log("this is great!");
        }
    }
});

app.get("/cities", function(req,res)=>{
    req.json=cities: [
            {
                name: 'Berlin',
                country: 'Germany'
            },
            {
                name: 'Hamburg',
                country: 'Germany'
            }
        ]
})


mounted: function(){
    var me: this;
    axios.get("/images").then(function(resp){
        me.images * resp.data.images
    })
}

res.json({
    images:result.rows
})

data:{
    images : [],
}

app.get("/cities", (req, res)=>{

    db.cities().then(result => {
        res.json({
            cities: result.rows
        })
    })
})

//-------------------
//TUESDAY

when you use a constructor you get an instance!

//---------------------
//WEDNESDAY



Vue.component("some-component", {
    //1 name of component, 2 object similar to the vue thing under
    //WITHOUT el
    //in html <some-component></some-component>
    /* data, methods, etc. go here */
    //1 diference there's no el but a template
    //2 in data you pass a function that returns an object
    data: function() {
        return {
            message: "hi!"
        };
    }
});

//inline-template
<some-component inline-template>
    <strong>{{message}}</strong>
</some-component>

//pass the template here in the component
Vue.component("some-component", {

    data: function() {
        return {
            message: "hi!"
        };
    },
    template: "#tmpl" //this refers to a html tag
});

//in html OUTSIDE OF THE EL PROPERTY
<script id="tmpl" type="text/x-template">
    <strong>{{message}}</strong>
</script>

//pass a string to the template as weelll
//VERY IMPORTANT the template can only send one element so put everything in a div!!
//Not advisable because the `` dont work in old browsers!!
Vue.component("some-component", {

    data: function() {
        return {
            message: "hi!"
        };
    },
    template: `
                <div>
                    <strong>{{message}}</strong>
                    <a href="https://spiced.academy">{{message}}</a>
                </div>
                `
});

<some-component></some-component>
//PROPS

Vue.component('individual-city', {
    props: ['id', 'name', 'country'],// array for the properties that will be used
    template: '<span>{{name}}, {{country}}</span>'
});

new Vue({
    el: '#main',
    data: {
        cities: [
            {
                id: 1,
                name: 'Berlin',
                country: 'Germany'
            },
            {
                id: 2,
                name: 'Hamburg',
                country: 'Germany'
            }
        ]
    }
});

your components will receive props and will react to changes
BUT THE COMPONENT SHOULD NEVER CHANGE ITSELF

<div id="main">
    <ul>
        <li v-for="city in cities">
            <individual-city
                v-bind:id="city.id" //they are attributes but they become props
                 v-bind:name="city.name"
                 v-bind:country="city.country">
             </individual-city>
        </li>
    </ul>
</div>

methods: {
    changeFirstCityToDenver:function(){
        this.cities[0].name
    }
}

the child should get changes from the parent

the child cant change the parent but it should be changed by its parent

the parent can also change itself, the child cant change the parent but can tell the parent to change itself with events!


template: '<div v-on:click'
methods: function(){
    this.$emit('denverize', this.// IDEA: )
}

v-on:denverize="denverize"

//-------------------------------
//Thursday Part 4


when user clicks the more see

exports.getImages = function() {
    return db.query(`SELECT * FROM images
        ORDER BY id DESC
        LIMIT 9
        WHERE id < $1;`);
};

to reach the end of the images sub query if you know for certain check the lowest id at the time


addEventListener("hashchange", function(){
console.log(location.hash)
})

change the currentImageId: location.hash.slice(1)

when you close the modal you should manually locationhash to an empty string

created:function(){
    var self = this;
    addEventListener("hashchange", function(){
        self.currentImageId = location.hash.slice(1)
    })
}

after set a listener Watchers

watch:{
    id: function(){
        axios.get("/image/" + this.id)
    }
}

if the user enters an invalid id just send an error code


bonus 1

SELECT title,(
    SELECT title
    FROM songs
    ORDER BY id DESC
    WHERE id<10
) as prev_title
FROM songs
ORDER BY id DESC
WHERE id = 10;


//presentations,

you can hide the overflow of the main page so the scroll bar disapears!!

make a delete button

next and previous








//
