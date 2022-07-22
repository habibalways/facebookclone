// get element

const Post_form = document.getElementById("Post-form");
const msg = document.querySelector('.msg');
const all_post = document.querySelector('.all_post');

// get all post
const getAllPost = () => {
    let posts = readLSData('fb_post');
  list = '';
  
  if (!posts || posts.lenth == 0) {
    list = 'No post found';
    
    // return false;
  } else {
    
    
    posts.reverse().map((data) => {
      list += `
        <div class="card my-4 mb-5">
        <div class="post_area">
          <div class="post_header d-flex">
            <div class="autorinfo d-flex">
              <img style="width: 40px; height:40px; object-fit:cover; border-radius: 50%; margin-right: 10px;"  src="${data.aphoto}" alt="">
              <span>${data.aname}<br><span>2h . <i class="fas fa-globe-africa"></i></span></span>
              
            </div>
            <div class="edite_delete_post">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-ellipsis-h"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item edite_post" href="#">Edite</a></li>
                  <li><a class="dropdown-item delet_post" post_id=${data.id} href="#">Delete</a></li>
                </ul>
              </div>
              
            </div>
          </div>
          <div class="post_body">
            <p>${data.pcontent}</p>
            ${data.pphoto ? '<img style="width: 100%; height:auto; object-fit:cover" src=" ' + data.pphoto + '" alt="">' : ''}
          </div>
        </div>
     </div>

        `
    });
  }
    all_post.innerHTML = list;
    console.log(list);
  
}
getAllPost();

// post form submit
Post_form.onsubmit = (e) => {
    e.preventDefault();
    // form data get
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    const { aname, aphoto, pcontent, pphoto } = Object.fromEntries(form_data.entries());
  const randId = Math.floor(Math.random() * 1000) + '_' + Date.now();
  
    if (!aname || !aphoto || !pcontent ) {
        msg.innerHTML = setAlert('All fields are required');
    } else {
        createLSdata('fb_post', {...data, id:randId});
        e.target.reset();
        getAllPost();
    }
}
// data delete
all_post.onclick = (e) => {
  e.preventDefault();
  //delete post
  if (e.target.classList.contains('delet_post')) {
    //get post id
    let post_id = e.target.getAttribute('post_id');
   
    // get all post
    let full_post = readLSData('fb_post')
    console.log(full_post);
    // delete data
    let deleted_data = full_post.filter(data =>  data.id !== post_id );
   
    updateLsdata('fb_post', deleted_data);
    getAllPost();
  }
  

 }