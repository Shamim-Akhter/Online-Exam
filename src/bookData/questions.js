const generalQuestion = [
    {
        id : 1,
        title: 'Which city is called pink city ?',
        options:['Bangalore','Jaipur','Gurgaon','Mangalore'],
        answer:1
    },
    {
        id : 2,
        title: 'Which city is called electronic city ?',
        options:['Bangalore','Mysore','Chennai','Howrah'],
        answer:0
    },
    {
        id : 3,
        title: 'Where is qutub minar ?',
        options:['Agra','Rajasthan','Delhi','Hyderabad'],
        answer:2
    },
    {
        id : 4,
        title: 'Who built Red Fort?',
        options:['Akbar','Babar','Shahjahan','Jahangir'],
        answer:2
    },
    {
        id : 5,
        title: 'Who is president of India?',
        options:['Mamta Banerjee','Narendra Modi','Amit Shah','Droupadi Murmu'],
        answer:3
    },
];

const computerScienceQuestion = [
    {
        id:1,
        title:'What is the full form of OS',
        options:['Operating System','Operation System','Operating Synchronization','Operation Synchronization'],
        answer:0
    },
    {
        id:2,
        title:'Which of the following computer networks is built on the top of another network?',
        options:['Overlay Network','Prime Network','Prior Network','Chief Network'],
        answer:0
    },
    {
        id:3,
        title:'How many layers are there in the ISO OSI reference model?',
        options:['7','5','4','6'],
        answer:0
    },
];

const mathQuestion = [
    {
        id:1,
        title:"What is the sum of 2+2",
        options:['3','4','5','6'],
        answer:1
    },
    {
        id:2,
        title:"Total number of prime numbers between 1 to 100",
        options:['24','23','25','26'],
        answer:2
    }
]

module.exports = {generalQuestion,computerScienceQuestion,mathQuestion};