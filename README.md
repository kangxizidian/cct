# core-chinese-text
核心古籍 htll 格式

## XML 語法檢查
檢查是否有空標籤 （html 模式不允許，會干擾文件結構）

檢查標記是否平衡，忘了關或忘了開。

自動檢查所在目錄下所有的htm 檔內的，xml 標籤包住的內容。

    node check.js

