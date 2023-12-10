import { ChatProps, UserProps } from './types';
import axios, { AxiosResponse } from 'axios';


const selectedId = '1ggfJ0eRxkdu132uB8dj';

// Function to fetch data using Axios
export async function FetchForum({selectedId}:any) {
  try {
    const response = await axios(
      {
        method: "get",
        url: `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/forum`,
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

// Function to fetch data using Axios
export async function FetchUsers({selectedId}:any) {
  try {
    const response = await axios(
      {
        method: "get",
        url: `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}}/users`,
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
    const fetchedChats = await FetchForum(selectedId);
    // Use fetchedChats data here
    console.log(fetchedChats);

    // Assign fetchedChats to chats
    const chats: ChatProps[] = fetchedChats;
    return chats;
    
    

  } catch (error) {
    // Handle error
    console.error(error);
  }
})();

(async () => {
  try {
    const fetchedUsers = await FetchUsers(selectedId);
    // Use fetchedChats data here
    console.log(fetchedUsers);

    // Assign fetchedChats to chats
    const users : UserProps[] = fetchedUsers;
    return users;
    
    

  } catch (error) {
    // Handle error
    console.error(error);
  }
})();

// Exporting chats as a Promise that resolves with the fetched data
export const chatsPromise: Promise<ChatProps[]> = FetchForum(selectedId);

// Alternatively, if you want to export chats after it's resolved, you can use the then method
let chats: ChatProps[] = [];
FetchForum(selectedId)
  .then((fetchedChats) => {
    chats = fetchedChats;
  })   
  .catch((error) => {
    // Handle error
    console.error(error);
  });

// Export chats variable after it's resolved (You might need to manage asynchronous behavior accordingly)
export { chats };


// Exporting chats as a Promise that resolves with the fetched data
export const usersPromise: Promise<UserProps[]> = FetchForum(selectedId);

// Alternatively, if you want to export chats after it's resolved, you can use the then method
let users: UserProps[] = [];
FetchForum(selectedId)
  .then((fetchedChats) => {
    chats = fetchedChats;
  })   
  .catch((error) => {
    // Handle error
    console.error(error);
  });

// Export chats variable after it's resolved (You might need to manage asynchronous behavior accordingly)
export { users };



