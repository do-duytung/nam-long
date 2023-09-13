var data = {
    userlist: [{
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
    }],
    features: ['Measure Qi', 'Health check', 'Dairy']
}

(function() {
    runExample1();
    runExample2();
  
    function runExample1() {
      var list1 = m.component(List, {
        listItems: data.features,
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
        listItems: data.userlist,
        listItemTag:'a[href=\'#\']',
        listItemFormatter: formatter,
        listItemActive: activeChecker,
        //listItemOnclick:onclick
      }); 
     
      m.mount(document.getElementById('example2'), list2);
    }
  })();