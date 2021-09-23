import axios from "axios";

const removeCardActions = ()=>{
    localStorage.removeItem("PostCardAction");
}

export const handlePostActions = (props,cb = ()=>{}) => {
  try {
    let postCardActionstr = localStorage.getItem("PostCardAction");
    if (postCardActionstr != null) {
      let postCardActions = JSON.parse(postCardActionstr);
      let token = localStorage.getItem("token");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      const promises = postCardActions.map((postCardAction, index) => {
        return axios.post(postCardAction.url, postCardAction.body, { headers });
      });

      promises.map(async (promise, index) => {
        try {
          const res = await promise;
          if (index === postCardActions.length - 1) {
            props.history.push("/cart");
            removeCardActions()
          }
        } catch (error) {
          props.history.push("/cart");
        }
      });
    }
    else {
        cb()
    }
  } catch (error) {
      alert('error')
  }
};
