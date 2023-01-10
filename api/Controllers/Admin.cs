using Dapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Musiac.Actions;
using Musiac.Models;
using System.Data;
using System.Data.SqlClient;

namespace Musiac.Controllers
{
    [EnableCors("localhost")]
    [Route("[controller]")]
    [ApiController]
    public class Admin : ControllerBase
    {
        private const string conn = "Server=localhost;Database=Music;User Id=MyLogin;Password=1111;";
 
        [HttpPost("MoveFiles")]
        public List<string> Post(string path)
        {
            return FileMover.Initializer("Chill")
                 .GetFolders()
                 .GetFiles()
                 .MoveFiles(path)
                 .GetMovedFiles();
        }

        [HttpGet("GetPlaylist")]
        public List<PlayList> Get()
        {
            using IDbConnection db = new SqlConnection(conn);

            return db.Query<PlayList>($"Select Id, {AdminHelper.Names} From PlayList").ToList();
        }

        [HttpPost("AddItem")]
        public int Post(PlayList playLists)
        {
            using IDbConnection db = new SqlConnection(conn);
            string sqlQuery = $"Insert Into PlayList ({AdminHelper.Names}) Values({AdminHelper.Props})";

            return db.Execute(sqlQuery, playLists);
        }

        [HttpPost("AddList")]
        public int Post(List<PlayList> playLists)
        {
            using IDbConnection db = new SqlConnection(conn);
            string sqlQuery = $"Insert Into PlayList ({AdminHelper.Names}) Values({AdminHelper.Props})";
            int rows = 0;

            playLists.ForEach(item =>
            {
               rows += db.Execute(sqlQuery, item);
            });
            return rows;
        }

        [HttpPut("UpdateItem")]
        public int Put(PlayList item)
        {
            using IDbConnection db = new SqlConnection(conn);
            string query = $"UPDATE [dbo].[PlayList] SET [Root] = @Root, [Path] = @Path, [Ext] = @Ext, [BoxArt] = @BoxArt WHERE Id = @Id";
            return db.Execute(query, item);
        }

        [HttpDelete("RemoveList")]
        public int Delete()
        {
            using IDbConnection db = new SqlConnection(conn);
            string query = "DELETE FROM [dbo].[PlayList]";
            return db.Execute(query);
        }

        [HttpDelete("RemoveItem")]
        public int Delete(int id)
        {
            using IDbConnection db = new SqlConnection(conn);
            string query = $"DELETE FROM [dbo].[PlayList] WHERE Id = {id}";
            return db.Execute(query);
        }
    }

    public static class AdminHelper
    {
        public static string Names => "Root, Path, Ext, BoxArt";
        public static string Props => "@Root, @Path, @Ext, @BoxArt";
    };
}