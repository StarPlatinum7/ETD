import openpyxl

# 打开 Excel 文件
workbook = openpyxl.load_workbook('./data_transfer/联通.xlsx')

# 选择工作表
sheet = workbook.active

# 获取每列的数据
tokenid = []
code = []
walletaddress = []

for row in sheet.iter_rows(values_only=True):
    tokenid.append(row[0])
    code.append(row[1])
    walletaddress.append(row[2])

# 打印数据或进行其他处理
print(len(tokenid))
print(code[1])
print(walletaddress[1])

# 关闭工作簿
workbook.close()
