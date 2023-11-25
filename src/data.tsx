import { ChatProps, UserProps } from './types';
import axios, { AxiosResponse } from 'axios';



// Function to fetch data using Axios
export async function FetchData() {
  try {
    const response = await axios(
      {
        method: "get",
        url: `http://localhost:5555/class/1ggfJ0eRxkdu132uB8dj/forum`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle error here
    throw new Error('Failed to fetch data');
  }
}

(async () => {
  try {
    const fetchedChats = await FetchData();
    // Use fetchedChats data here
    console.log(fetchedChats);

    // Assign fetchedChats to chats
    const chats: ChatProps[] = fetchedChats.messages;
    const users: UserProps[] = fetchedChats.users;
    return chats;
    
    

  } catch (error) {
    // Handle error
    console.error(error);
  }
})();

// Exporting chats as a Promise that resolves with the fetched data
export const chatsPromise: Promise<ChatProps[]> = FetchData();

// Alternatively, if you want to export chats after it's resolved, you can use the then method
let chats: ChatProps[] = [];
FetchData()
  .then((fetchedChats) => {
    chats = fetchedChats;
  })   
  .catch((error) => {
    // Handle error
    console.error(error);
  });

// Export chats variable after it's resolved (You might need to manage asynchronous behavior accordingly)
export { chats };


export const users: UserProps[] = [
  {
    name: 'Khairul Liza',
    username: 'khairulliza@gmail.com',
    avatar: '/static/images/avatar/2.jpg',
    online: true,
  },

];

