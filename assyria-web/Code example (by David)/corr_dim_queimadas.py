#!/usr/bin/python
#-*- coding:utf-8 -*-

from math import ceil
import pylab as plt
import numpy as np
import time
import os
import csv
from tqdm import trange

#####################################################################
#####################################################################
########### Mini program for calculate distance in 2d
### Distancia euclideana
def dist(xa,ya,xb,yb):
	return np.sqrt((xa - xb)**2 + (ya-yb)**2)
#####################################################################
## Distancia Triangular Esférica 
def dist_triesf(xa,ya,xb,yb):
	R = 6371.0
	theta1 = (90.0 - xa) * (np.pi/180.0)
	theta2 = (90.0 - xb) * (np.pi/180.0)
	phi1 = ya * (np.pi/180.0)
	phi2 = yb * (np.pi/180.0)
	eq1 = np.cos(theta1) * np.cos(theta2)
	eq2 = np.sin(theta1) * np.sin(theta2) * np.cos(phi1-phi2)
	eq3 = eq1 + eq2
	acos = round(np.arccos(eq3),6)
	## Transforma a distância angular em distância em km
	fim = R * acos
#	print eq1, eq2, eq3, acos
	return fim
#####################################################################
#####################################################################
print("\n              Correlation Dimension in 2d \n")
###########              The Program Start                ###########

time_ini = time.time()

print("\n     Process Data ... Wait!!!")
######################################################################
print("\n      Read poX_posY.dat's ")
###
dados = []
latitude = []
longitude = []
cont_dados = 0

## Lê e conta o número total de dados disponíveis no arquivo em formato csv
with open('Caatinga-2016_test.csv') as File:
	reader = csv.reader(File, delimiter=';')#, quoting=csv.QUOTE_MINIMAL)
	for row in reader:
		dados.append(row)
		cont_dados += 1 
#		print(row)

#print dados[0] ## Linha de Names

## Adiciona as coordenadas geográficas nos arrays de latitude e longitude
for i in range(1,cont_dados):
	latitude.append(float(dados[i][9].replace(',', '.')))
	longitude.append(float(dados[i][10].replace(',', '.')))
#	latitude.append(float(dados[i][9]))
#	longitude.append(float(dados[i][10]))

#####################################################################

tsx = latitude ## Array das latitudes
tsy = longitude ## Array das longitudes

### Generating empty displacement matrix
### Gera uma matriz de distância vazia
serie = []
matrix= []

n = cont_dados - 1
print("Numero de dados", n)
N = float(n)
m = n

for ii in trange(n):
	matrix.append([])
	for jj in range(m):
		matrix[ii] = []

print("\n- Matrix:", n,"X",m)
#print "x=",len(tsx),tsx
#print "y=",len(tsy),tsy, "\n"
print("\n Calculating Distaces  \n")
### Calculating the distances and filling the matrix
### Calcula as distâncias entre os pontos e preenche a matriz
for element1 in trange(len(tsx)):
	for element2 in range(len(tsy)):
#		print "poin(",tsx[element1], ",",tsy[element1], ") with (",tsx[element2], ",",tsy[element2],")"
#		distance = dist(tsx[element1], tsy[element1], tsx[element2], tsy[element2])
		distance = dist_triesf(tsx[element1], tsy[element1], tsx[element2], tsy[element2])
#		serie.append(round(distance,4))
		serie.append(distance)
## Convert in matrix
	matrix[element1] = serie
	serie = []

## looking for the maximum distance to establish a limit to r and print matrix
## Procura a distância máxima entre os pares de eventos para definir um limite

maxmax = []

print("\n")
for o in range(m):
	# print(matrix[o])
	maxmax.append(max(matrix[o]))
#
print("\n Lista de Maximos:", maxmax)
#
maximo = max(maxmax)
#
##
r_vec = []
ir = 1.0
#increase = 1.2
increase = 2.0
limit = ceil(maximo)

while ir <= limit+increase:
	r_vec.append(ir)
	ir *= increase
print("\n r_max=", maximo, "aprox" , limit , "\n")

##
##
#r_vec = np.arange(1.0, maximo + increase, increase)
#print "Vector r =", r_vec, "\n"
#
## Defining the sum and the counter
sumatorio = []
count = []
print("\n Computando a Df \n")

print("r_vec", r_vec)

## Applying the condition Correlation Dimension
## Aplica a condição do Correlation Dimension
for r in r_vec:
	print("\n-r=", r)
	for o in range(m):
		for p in range(n):
			if o == p: # for the upper (or lower) diagonal of the matrix o < p and cancel the condition pass
					pass
			else:
				# print("matrix[o][p]", matrix[o][p])
				diff = r - matrix[o][p]
#				print "elementos", o, p, "=" ,matrix[o][p], "r=", r, "diff=", diff
				## Funtion Theta Heavside
				if diff >= 0:
					count.append(1)
					#print "counter=",sum(count)
	sumatorio.append(sum(count))
	count = []

print('sumatorio', sumatorio)

######################################################################
log_r = []
cn = []
log_cn = []
## Applying logarithm 
#
for cada in range(len(r_vec)):
	log_r.append(np.log(r_vec[cada]))
	dim = (2*sumatorio[cada])/(N*(N-1))
	cn.append(dim)
	log_cn.append(np.log(dim))

print('log_r', log_r)
print('cn', cn)
print('log_cn', log_cn)

#
## Correlation Dimension
#
print("\n Gerando Arquivo .dat \n")
arq_log_log = open("LogR_LogCn_SC16_distriesf.dat","a")
for t in range(len(log_cn)):
	arq_log_log.write("%s\t%s\n" %(log_r[t],log_cn[t]))
arq_log_log.close()

## Plot!
print("\n Gerando o gráfico \n")
# coeffs=np.polyfit(np.log(r_vec), np.log(cn), 1)
coeffs=np.polyfit(log_r, log_cn, 1)
print("np.log(r_vec) = ", np.log(r_vec))
print("np.log(cn) = ", np.log(cn))
print("coeffs = ", coeffs)
print("Correlation Dimension = ",coeffs[0])
####### Plot:
plt.plot(log_r, log_cn, "-o",color='blue',label="Corr Dimension = %.8s" %(coeffs[0]) )
plt.title("Corr Dimension" )
plt.xlabel("Log(r)", fontsize=14, color='black')
plt.legend()
plt.ylabel("Log(cn)", fontsize=14, color='black')
plt.savefig("plot_Dimf_SC16_distriesf.png")
#plt.show()

#######################################################################
#######################      Time execution      ######################
#######################################################################

time_fin = time.time()
duration = time_fin-time_ini
days = int(duration/86400)
miliseconds = int(duration)-duration
print("\n-------------------------------------------------------------")
print("----->   Program execution time: ", days,":",time.strftime("%H:%M:%S", time.gmtime(duration)))
print("----->   Program execution time: ", (time_fin-time_ini),"Sec.  <-----")

