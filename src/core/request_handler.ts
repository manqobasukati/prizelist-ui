export async function get_store_branches(data: any): Promise<any> {
  let resp = {};
  // const params = {
  //     method: 'POST',
  //     url: Config.network_url + BACKEND_SERVICES.get_word_freq_response,
  //     headers: {
  //         'Content-Type': 'application/json',

  //     },
  //     body: JSON.stringify(data),
  // };

  await fetch(`http://localhost:8000/shops/${data.shop_id}/branches`)
    .then(response => response.json())
    .then(data => {
      resp = data;

      return resp;
    })
    .catch(error => {
      console.error('Error:', error);
      return error;
    });

 

  return resp;
}

export async function get_branch_prizelist(data: any) {
  let resp = {};
  await fetch(`http://localhost:8000/shops/${data.shop_id}/branches/${data.branch_id}/prize-lists`)
    .then(response => response.json())
    .then(data => {
      resp = data;

      return resp;
    })
    .catch(error => {
      console.error('Error:', error);
      return error;
    });

  

  return resp;
}


export async function  upload_branch_prize_list(data:any) {
 console.log(data)
  const file = data.file;
  const formData = new FormData()
  formData.append('prize_list', data.file);
  formData.append('branch', data.branch_id);
  formData.append('shop', data.shop_id);
  formData.append('date_valid_to',data.date_valid_to);
  formData.append('active', data.active)
  const url = `http://localhost:8000/shops/${data.shop_id}/branches/${data.branch_id}/prize-lists/`

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error(error)
  })
}

