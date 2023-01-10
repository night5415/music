using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Musiac.Models;

namespace Musiac.Controllers
{
    [EnableCors("localhost")]
    [Route("[controller]")]
    [ApiController]
    public class VideoList : ControllerBase
    {
        [HttpGet(Name = "GetVideoList")]
        public IEnumerable<Video> Get()
        {
            var index = 0;
            videos.ForEach(v => v.Id = ++index);

            return videos;
        }
        readonly List<Video> videos = new() {
        new() {
            Root= "Chill",
            Path= "Zelda-I",
            Ext= "mp4",
            },
         new() {
            Root= "Delete",
            Path= "Delete",
            Ext= "mp4",
        },
        new() {
            Root= "Chill",
            Path= "Zelda-II",
            Ext= "mp4",
        },
        new() {
            Root= "Chill",
            Path= "Zelda-III",
            Ext= "mp4",
        },
        new() {
            Root= "Chill",
            Path= "BOTW-Melody",
            Ext= "mp4",
        },
        new() {
            Root= "Chill",
            Path= "BOTW-Necluda",
            Ext= "mp4",
        },
        new() {
            Root= "Chill",
            Path= "Halo-Infinite",
            Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "Super-Metroid",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "Metroid-Atmosphere",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "Mood-Music",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "Programming-Music-2",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "Programming-Music",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "SkyRim-Ambience",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "SkyRim-Music",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "Studio-Ghibli",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "Super-Guitar-Bros",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "WoW-Lich-King",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "Night-Elf-Music",
        Ext= "mp4",
        },

        new() {
        Root= "Chill",
        Path= "Tron-Music",
        Ext= "mp4",
        },
        new() {
        Root= "Chill",
        Path= "Tron-Ambience",
        Ext= "mp4",
        },

        new() {
        Root= "Lofi",
        Path= "Hollow-Knight",
        Ext= "mp4",
        },
        new() {
        Root= "Lofi",
        Path= "Sounds",
        Ext= "mp4",
        },
        new() {
        Root= "Lofi",
        Path= "Jazz",
        Ext= "mp4",
        },
        new() {
        Root= "Lofi",
        Path= "Soft-Music",
        Ext= "mp4",
        },
        new() {
        Root= "Lofi",
        Path= "Breath-of-the-Wild",
        Ext= "mp4",
        },
        new() {
        Root= "Lofi",
        Path= "Nintendo-Synthwave",
        Ext= "mp3",
        },
        new() {
        Root= "Fun",
        Path= "I-Remember",
        Ext= "mp4",
        },
        new() {
        Root= "Fun",
        Path= "Party-Rock",
        Ext= "mp4",
        },
        new() {
        Root= "Fun",
        Path= "Thrift-Shop",
        Ext= "mp4",
        },
       };
    }
}
