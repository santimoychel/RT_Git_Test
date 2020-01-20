({ 
   sortBy: function(component, field) {
        var sortAsc = component.get("v.sortAsc"),
            sortField = component.get("v.sortField"),
            records = component.get("v.DispRecordList");
        sortAsc = sortField != field || !sortAsc;
       console.log('>>>>>',sortAsc);
        records.sort(function(a,b){
            console.log('>>a>>',a);
            console.log('>>b>>',b);
            var t1 = a[field] == b[field],
                t2 = (!a[field] && b[field]) || (a[field] < b[field]);
            return t1? 0: (sortAsc?-1:1)*(t2?1:-1);
        });
        console.table(records);
        component.set("v.sortAsc", sortAsc);
        component.set("v.sortField", field);
        component.set("v.DispRecordList", records);
       
    },
	
   
})