var Layout = {
    view: function(vnode) {
        return m("main.layout", [
            m("nav.menu", [
                m(m.route.Link, {
                  href: '/feature1'
                }, "Feature 1"),
            ]),
            m("section", vnode.children)
        ])
    }
}
