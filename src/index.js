import m from "mithril";
m.route.prefix = "";

var Home = {
    view: function() {
        return "Welcome"
    }
}

m.route(document.body, "/home", {
    "/home": Home, // defines `https://localhost/#!/home`
})