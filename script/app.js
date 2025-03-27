Alpine.store("settings", {
    apiBaseUrl:"http://172.17.100.14:3380/default/api/",  
    appName: "contact application",  
});

Alpine.store("GlobalVariable", {
    //contacts:Alpine.reactive([]),
    contacts:Alpine.reactive({ 
        data: [], 
        total: 0,         
    }),
    // Add chat storage
    chats: Alpine.reactive({
        data: [],
        total: 0
    }),
    queryParams: Alpine.reactive({}), // Keep query parameters reactive
});

Alpine.store("GlobalFunctions", { 
    findContactById(id) {        
        let contacts = Alpine.store("GlobalVariable").contacts.data; // Ensure `data` is always an array
        let foundContact = contacts.find(c => Number(c.id) === Number(id));
        
        if (foundContact) {
            return {...foundContact }; // Creates a new object to trigger reactivity
        } else {
            return {}; // Returns an empty object if not found
        }
    },
    
    // Add this chat function
    async fetchChats() {
        try {
            const response = await fetch(`${Alpine.store("settings").apiBaseUrl}exam/chat/`);
            if (response.ok) {
                const data = await response.json();
                Alpine.store("GlobalVariable").chats.data = data;
                Alpine.store("GlobalVariable").chats.total = data.length;
                return data;
            } else {
                console.error("Failed to fetch chats:", response.statusText);
                return [];
            }
        } catch (error) {
            console.error("Error fetching chats:", error);
            return [];
        }
    }
});



