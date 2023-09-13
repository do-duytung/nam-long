var List = 
// This is the component of List Widget.
// It is intentionally wrapped in a function call
// It will be exported into global variable List
(function() {
  // List widget
  var ListComponent = {
    controller: function(data) {
      // default model
      var model = {
        listItems: m.prop([]),
        listGroupTag: m.prop('div'),
        listItemTag: m.prop('a'),
        listItemFormatter: function(li) {
          return li;
        },
        listItemActive: function(li) {
          return false;
        },
        listItemOnclick: function(li) {}
      }
      init();

      function init() {
        // copy data to model if exist
        data.listItems && model.listItems(data.listItems);
        data.listGroupTag && model.listGroupTag(data.listGroupTag);
        data.listItemTag && model.listItemTag(data.listItemTag);

        data.listItemFormatter &&
          (model.listItemFormatter = data.listItemFormatter);

        data.listItemActive &&
          (model.listItemActive = data.listItemActive);

        data.listItemOnclick &&
          (model.listItemOnclick = data.listItemOnclick);
      }

      return {
        model: model
      }
    },
    view: function(ctrl) {
      var model = ctrl.model;
      var listItems = model.listItems();

      return m('', createList(listItems));

      function createList(listItems) {
        return m(model.listGroupTag() + '.list-group',
          listItems.map(function(listItem) {
            return m(model.listItemTag() + '.list-group-item', {
                class: model.listItemActive(listItem) ? 'active' : '',
                onclick: model.listItemOnclick.bind(this,listItem)
              },
              model.listItemFormatter(listItem));
          })
        );
      }
    }
  }
  return ListComponent;
})();

(function() {
  // data used for both example
  var data = {
    example1: [
      'Cras justo odio',
      'Dapibus ac facilisis in',
      'Morbi leo risus',
      'Porta ac consectetur ac',
      'Vestibulum at eros'
    ],
    example2: [{
      title: 'KF',
      description: 'My name is KF',
      count: '1'
    }, {
      title: 'PW',
      description: 'My name is PW',
      count: '3'
    }, {
      title: 'JY',
      description: 'My name is JY',
      count: '5',
      status: 'active'
    }]
  }

  runExample1();
  runExample2();

  function runExample1() {
    var list1 = m.component(List, {
      listItems: data.example1,
      listItemTag: 'li',
      listGroupTag: 'ul',
    });

    m.mount(document.getElementById('example1'), list1);
  }

  function runExample2() {  
    function formatter(li) {
      return [m('h4.list-group-item-heading', li.title),
        m('span.badge', li.count),
        m('p.list-group-item-text', li.description)
      ];
    }

    function activeChecker(li) {
      return li.status == 'active';
    }

    function onclick(li) {
      alert('hi');
      if(!li.status) li.status = 'active';
      else if(li.status ==='active') li.status = null;
    }

    var list2 = m.component(List, {
      listItems: data.example2,
      listItemTag:'a[href=\'#\']',
      listItemFormatter: formatter,
      listItemActive: activeChecker,
      //listItemOnclick:onclick
    }); 
   
    m.mount(document.getElementById('example2'), list2);
  }
})();