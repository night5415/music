namespace Musiac.Interfaces
{
    public interface IGetFolders
    {
        public IGetFiles GetFolders();
    }

    public interface IGetFiles
    {
        public IMoveFiles GetFiles();
    }

    public interface IMoveFiles
    {
        public IMovedFiles MoveFiles(string path);
    }
    public interface IMovedFiles {
        public List<string> GetMovedFiles();
    }
}