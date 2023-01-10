IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PlayList]') AND type in (N'U'))
DROP TABLE [dbo].[PlayList]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PlayList](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Root] [nvarchar](max) NULL,
	[Path] [nvarchar](max) NULL,
	[Ext] [nvarchar](max) NULL,
    [BoxArt] [nvarchar](max) NULL
 CONSTRAINT [PK_dbo.PlayList] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
