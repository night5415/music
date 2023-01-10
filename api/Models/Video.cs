namespace Musiac.Models
{
    public record Video
    {
        public int Id { get; set; }
        public string Root { get; set; }
        public string Path { get; set; }
        public string Ext { get; set; }
    }
}
