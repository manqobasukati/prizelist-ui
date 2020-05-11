export function build_tree_nodes(data:any):any{
    console.log(data)
    const nodes = [];

    const shop = {
        label:data[0].shop.name,
        children:Array()
    };

    data.forEach((branch:any) => {
        const child = {
            label:branch.name,
            id:branch.id
        }
        shop.children.push(child)
    });

    
    

    nodes.push(shop)

    return nodes
}


export function router_get_last_part(route:string):string{
   const arr_str = route.split('/');

   return arr_str[arr_str.length-1];
}