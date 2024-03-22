using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class BookCollectionContext : DbContext
    {
        public BookCollectionContext(DbContextOptions<BookCollectionContext> options) : base(options)
        {
            
        }

        public DbSet<BookCollection> BookCollections { get; set; }
    }
}
