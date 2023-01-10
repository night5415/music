
using Musiac.Interfaces;
using Musiac.Models;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using static System.Environment;

namespace Musiac.Actions
{
    public class FileMover : IGetFolders, IGetFiles, IMoveFiles, IMovedFiles
    {
        private readonly string? _folder;
        private readonly List<string> Files;
        private List<string>? Folders;
        private static string GetVideoFolder() => GetFolderPath(SpecialFolder.MyVideos);
        private static string GetInetPubFolder() => "C:/inetpub/wwwroot/Music/";
        private FileMover(string folder)
        {
            _folder = folder;
            Files = new List<string>();
        }

        public List<string> GetMovedFiles() => Files;

        public static IGetFolders Initializer(string folder)
        {
            return new FileMover(folder);
        }

        public IGetFiles GetFolders()
        {
            if (_folder == null)
                return this;

            Folders = Directory.GetDirectories(GetVideoFolder(), _folder).ToList();
            return this;
        }

        public IMoveFiles GetFiles()
        {
            if (Folders == null)
                return this;


            foreach (var folder in Folders)
            {
                Files.AddRange(Directory.GetFiles(folder));
            }
            return this;
        }

        public IMovedFiles MoveFiles(string path)
        {
            Files.ForEach(origin =>
            {
                string fileName = Path.GetFileName(origin);
                string dest = $"{GetInetPubFolder()}{path}/{fileName}";
                File.Move(origin, dest);
            });

            return this;
        }
    }
}