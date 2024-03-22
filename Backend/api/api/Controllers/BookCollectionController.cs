using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookCollectionController : ControllerBase
    {
        private readonly BookCollectionContext _bookCollectionContext;
        public BookCollectionController(BookCollectionContext bookCollectionContext)
        {
            _bookCollectionContext = bookCollectionContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookCollection>>> GetBookCollections()
        {
            if (_bookCollectionContext.BookCollections == null)
            {
                return NotFound();
            }
            return await _bookCollectionContext.BookCollections.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookCollection>> GetBookCollection(int id)
        {
            if(_bookCollectionContext.BookCollections == null)
            {
                return NotFound();
            }
            var bookCollection = await _bookCollectionContext.BookCollections.FindAsync(id);

            if(bookCollection == null)
            {
                return NotFound();
            }
            return bookCollection;
        }

        [HttpPost]
        public async Task<ActionResult<BookCollection>> PostBookCollection(BookCollection bookCollection)
        {
            _bookCollectionContext.BookCollections.Add(bookCollection);
            await _bookCollectionContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookCollection), new { id = bookCollection.id}, bookCollection);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutBookCollection(int id, BookCollection bookCollection)
        {
            if(id !=  bookCollection.id)
            {
                return BadRequest();
            }
            _bookCollectionContext.Entry(bookCollection).State = EntityState.Modified;
            try
            {
                await _bookCollectionContext.SaveChangesAsync();
            } catch(DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBookCollection(int id)
        {
            if(_bookCollectionContext.BookCollections == null)
            {
                return NotFound();
            }
            var bookCollection = await _bookCollectionContext.BookCollections.FindAsync(id);

            if(bookCollection == null)
            { 
                return NotFound();
            }

            _bookCollectionContext.BookCollections.Remove(bookCollection);
            await _bookCollectionContext.SaveChangesAsync();

            return Ok();    
        }
    }
}
