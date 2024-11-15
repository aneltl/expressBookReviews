let books = {
    1: { "isbn": "9780141186887", "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
    2: { "isbn": "9780141329185", "author": "Hans Christian Andersen", "title": "Fairy Tales", "reviews": {} },
    3: { "isbn": "9780140448955", "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
    4: { "isbn": "9780140447217", "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
    5: { "isbn": "9780195007238", "author": "Unknown", "title": "The Book Of Job", "reviews": { 
        "review1": "This book talks about why bad things happen to good people. It made me think a lot about life and fairness.",
        "review2": "It was hard to get through, but the idea that Job never gave up was kind of inspiring."
    }},
    6: { "isbn": "9780140449389", "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
    7: { "isbn": "9780140447699", "author": "Unknown", "title": "Njál's Saga", "reviews": {} },
    8: { 
        "isbn": "9780141439518", 
        "author": "Jane Austen", 
        "title": "Pride and Prejudice", 
        "reviews": {
            "review1": "I really enjoyed this book! The relationship between Elizabeth and Mr. Darcy is so complex. At first, I thought he was just a jerk, but as the story goes on, you understand his feelings more. Elizabeth is strong and independent, which I loved.",
            "review2": "The writing can be a bit old-fashioned, but it’s worth it for the amazing characters and the way it explores love, pride, and prejudice. The way Jane Austen weaves social commentary into the romance is brilliant."
        }
    },
    9: { "isbn": "9780140449723", "author": "Honoré de Balzac", "title": "Le Père Goriot", "reviews": {} },
    10: { "isbn": "9780802144508", "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
};

module.exports = books;
