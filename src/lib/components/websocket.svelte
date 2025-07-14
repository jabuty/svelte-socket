<script lang="ts">
    import fetchMovie from "$lib";

    let socket: any;
    let chats :string[] = $state([]);
    let chatboxtext = $state("");

    function addToChats(){
        if(chatboxtext.length > 0)
        { 
            openSocket()
            sendMessage(chatboxtext)
            chats.push(chatboxtext)
            fetchMovie(1).then((data)=>chats.push(data))
            console.log(chats)
        }
        chatboxtext = "";

    }
    function addToChatsifEnterPressed(e:any){
        if(e.key==="Enter")
        { 
            addToChats()
        }
    }


    function openSocket() {
        socket = new WebSocket("ws://localhost:80/ws");
    }
    function sendMessage(chatmessage:string){
        socket.sendMessage(chatmessage);
    }

    function closeSocket() {
        socket.close();
    }

</script>

<p>Websocket Testing</p>

<div class="chatbox">
    <ul >
        {#each chats as chat}
            <li>{chat}</li>
        {:else}
            <li>----- Chat is empty -----</li>
        {/each}
    </ul>
</div>
<br/>

<input placeholder="Type text to send" type="text" bind:value={chatboxtext} onkeypress="{addToChatsifEnterPressed}"/>
<button onclick={addToChats}> send </button>

<style>
    li,
    input {
        font-size: 1em;
    }
    input {
        padding: 0.25em;
    }
    .chatbox{
        border:2px;
        border-color: black;
        border-style: solid;
        width: 350px;
    }
</style>
