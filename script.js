const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Get Quotes From API
// Gonna use  asynchronous fetch request
// async function can run anytime independently and it will stop the brwoser completing the loading of the page

let apiQuotes = [];// 0 indexed array

//show new quote
// function newQuote(){
//     //to pick a random quote from apiQuoyes array
//     const quote = LocalQuotes[Math.floor(Math.random()* LocalQuotes.length)];
//     console.log(quote);

// }


// Show loading
function loading() {
    loader.hidden =false;
    quoteContainer.hidden =true;
}

//Hider Loading

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//show new quote

function newQuote(){
    loading();
    //to pick a random quote from apiQuoyes array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    // To check if author field is blank and replace it with 'Unknown'
    if (!quote.author){
        authorText.textContent = 'Unknown' ;
    }
    else{
        authorText.textContent = quote.author;
    }
    // check the quote length to determine styling

    if(quote.text.length >50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    //set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();

}
// math.random returns number from 0 to less than 1


async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes[12]); 
        newQuote();

    } catch(errer){
        // Catch Error Here
    }
}




// To tweet a quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}




// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On load
getQuotes();
//newQuote();



// ctrl+r refresh
//ctrl+d multiple occ pe edit
// ctrl+? multiple line comment
// not comment part is fetch request one and comment part is from local quotes