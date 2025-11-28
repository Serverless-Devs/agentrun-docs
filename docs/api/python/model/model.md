---
sidebar_position: 2
title: Model
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Model

Model Service 模型定义

## 类

## BackendType

```python
class BackendType(str, Enum)
```

后端类型



## ModelType

```python
class ModelType(str, Enum)
```

模型类型



## Provider

```python
class Provider(str, Enum)
```




## ProxyMode

```python
class ProxyMode(str, Enum)
```




## ProviderSettings

```python
class ProviderSettings(BaseModel)
```

提供商设置



## ModelFeatures

```python
class ModelFeatures(BaseModel)
```

模型特性



## ModelProperties

```python
class ModelProperties(BaseModel)
```

模型属性



## ModelParameterRule

```python
class ModelParameterRule(BaseModel)
```

模型参数规则



## ModelInfoConfig

```python
class ModelInfoConfig(BaseModel)
```

模型信息配置



## ProxyConfigEndpoint

```python
class ProxyConfigEndpoint(BaseModel)
```




## ProxyConfigFallback

```python
class ProxyConfigFallback(BaseModel)
```




## ProxyConfigPolicies

```python
class ProxyConfigPolicies(BaseModel)
```




## ProxyConfig

```python
class ProxyConfig(BaseModel)
```




## CommonModelMutableProps

```python
class CommonModelMutableProps(BaseModel)
```




## CommonModelImmutableProps

```python
class CommonModelImmutableProps(BaseModel)
```




## CommonModelSystemProps

```python
class CommonModelSystemProps
```




## ModelServiceMutableProps

```python
class ModelServiceMutableProps(CommonModelMutableProps)
```




## ModelServiceImmutableProps

```python
class ModelServiceImmutableProps(CommonModelImmutableProps)
```




## ModelServicesSystemProps

```python
class ModelServicesSystemProps(CommonModelSystemProps)
```




## ModelProxyMutableProps

```python
class ModelProxyMutableProps(CommonModelMutableProps)
```




## ModelProxyImmutableProps

```python
class ModelProxyImmutableProps(CommonModelImmutableProps)
```




## ModelProxySystemProps

```python
class ModelProxySystemProps(CommonModelSystemProps)
```




## ModelServiceCreateInput

```python
class ModelServiceCreateInput(ModelServiceImmutableProps, ModelServiceMutableProps)
```

模型服务创建输入参数



## ModelServiceUpdateInput

```python
class ModelServiceUpdateInput(ModelServiceMutableProps)
```

模型服务更新输入参数



## ModelServiceListInput

```python
class ModelServiceListInput(PageableInput)
```




## ModelProxyCreateInput

```python
class ModelProxyCreateInput(ModelProxyMutableProps, ModelProxyImmutableProps)
```




## ModelProxyUpdateInput

```python
class ModelProxyUpdateInput(ModelProxyMutableProps)
```




## ModelProxyListInput

```python
class ModelProxyListInput(PageableInput)
```




