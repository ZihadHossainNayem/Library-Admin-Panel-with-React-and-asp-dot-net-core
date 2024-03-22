namespace api.Models
{
    public class BookCollection
    {
        public int id { get; set; }
        public string title { get; set;}
        public string? author { get; set;}
        public string? genre { get; set;}  
        public int? publishedYear { get; set;}
        public int isActive { get; set;}

    }
}
